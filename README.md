# 陈海旗个人作品集

基于 React + Vite 的剪辑师个人作品集网站基础版本。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 替换作品封面与视频

1. 将封面图片放入 `public/work/`。
2. 将视频文件放入 `public/videos/`（可自行新建目录）。
3. 打开 `src/portfolio.js`，修改对应项目的：
   - `image: '/work/你的封面.jpg'`
   - `video: '/videos/你的作品.mp4'`
4. 保存后页面会自动更新；点击项目卡片即可在线播放。

首页背景视频可放到 `public/media/`，再在 `src/portfolio.js` 的 `siteConfig.heroVideo` 中填写路径，例如：

```js
heroVideo: '/media/hero-showreel.mp4'
```

未填写时会自动显示当前的抽象视觉海报。

## Cloudflare Pages 部署

- 构建命令：`pnpm run build`
- 输出目录：`dist`
- 本地开发继续使用 `public/videos/` 中的视频。
- 生产构建会排除超过 Pages 单文件限制的本地 MP4，并使用 `VITE_VIDEO_BASE_URL` 指向外部视频存储。
- 未设置该变量时，线上版本默认从当前 GitHub LFS 仓库读取视频。
- 正式上线建议将视频上传到 Cloudflare R2，再把 `VITE_VIDEO_BASE_URL` 设置为 R2 公共地址下的 `videos` 路径。


## 视频网页优化

新增视频上线前，建议先用项目内脚本压缩并写入 Fast Start 元数据：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\optimize-video.ps1 -InputPath "D:\你的原视频.mp4" -OutputPath ".\public\videos\作品名.mp4"
```

脚本会输出适合网页播放的 H.264/AAC MP4（约 2.8 Mbps），并把 `moov` 元数据移动到文件前部，避免必须下载较多内容后才开始播放。

线上更换视频后，可以修改 Cloudflare Pages 环境变量 `VITE_VIDEO_VERSION`，触发播放器使用新缓存版本。

> GitHub LFS 适合当前过渡部署，但不是专业视频 CDN。需要根据访客网络自动切换清晰度时，建议后续迁移到 Cloudflare Stream；若只需要稳定分发 MP4，可迁移到 Cloudflare R2 自定义域名，并设置 `VITE_VIDEO_BASE_URL`。
