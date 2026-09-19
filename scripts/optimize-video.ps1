param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,

  [string]$OutputPath,

  [string]$FfmpegPath = 'D:\软件\剪映专业版\JianyingPro\11.4.5.14391\ffmpeg.exe'
)

$ErrorActionPreference = 'Stop'
$inputFile = (Resolve-Path -LiteralPath $InputPath).Path

if (-not $OutputPath) {
  $directory = Split-Path -Parent $inputFile
  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile)
  $OutputPath = Join-Path $directory ($baseName + '-web.mp4')
}

$outputFile = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = Split-Path -Parent $outputFile
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}

if (-not (Test-Path -LiteralPath $FfmpegPath)) {
  $ffmpegCommand = Get-Command ffmpeg -ErrorAction SilentlyContinue
  if (-not $ffmpegCommand) {
    throw '未找到 FFmpeg。请安装 FFmpeg，或通过 -FfmpegPath 指定 ffmpeg.exe。'
  }
  $FfmpegPath = $ffmpegCommand.Source
}

Write-Host "正在优化：$inputFile"
Write-Host "输出文件：$outputFile"

& $FfmpegPath -y -hide_banner -i $inputFile `
  -map 0:v:0 -map '0:a?' `
  -c:v h264_nvenc -preset p6 -tune hq -profile:v high `
  -rc vbr -multipass fullres -b:v 2800k -maxrate 3600k -bufsize 7200k `
  -spatial_aq 1 -temporal_aq 1 -aq-strength 8 -pix_fmt yuv420p `
  -c:a aac -b:a 128k -movflags +faststart `
  $outputFile

if ($LASTEXITCODE -ne 0) {
  throw "视频优化失败，FFmpeg 退出码：$LASTEXITCODE"
}

$sizeMiB = [Math]::Round((Get-Item -LiteralPath $outputFile).Length / 1MB, 2)
Write-Host "完成：$outputFile（$sizeMiB MiB）" -ForegroundColor Green
