import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  Clapperboard,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Play,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { experience, projectCategories, projects, siteConfig } from './portfolio';
import LineSidebar from './components/LineSidebar';
import AeroShards from './components/AeroShards';
import BorderGlow from './components/BorderGlow';

const sidebarItems = ['首页', '视频作品', '个人优势', '个人经历', '联系合作'];
const sectionIds = ['top', 'work', 'skills', 'about', 'contact'];

const glowColors = ['#8f76bd', '#b28be8', '#5f4c7f'];

function GlowCard({ children, className = '', intensity = 0.54, radius = 24, fillOpacity = 0.14 }) {
  return (
    <BorderGlow
      className={`card-glow ${className}`}
      edgeSensitivity={22}
      glowColor="268 55 72"
      backgroundColor="#1b1423"
      borderRadius={radius}
      glowRadius={20}
      glowIntensity={intensity}
      coneSpread={30}
      animated={false}
      colors={glowColors}
      fillOpacity={fillOpacity}
    >
      {children}
    </BorderGlow>
  );
}

const capabilities = [
  {
    no: 'A',
    icon: Clapperboard,
    title: '叙事剪辑',
    en: 'EDITORIAL',
    copy: '从信息结构到情绪节奏，让素材形成清晰、有记忆点的观看路径。',
  },
  {
    no: 'B',
    icon: Zap,
    title: '动态包装',
    en: 'MOTION',
    copy: '动态图文、MG 元素与转场设计，为知识、商业内容建立统一视觉语言。',
  },
  {
    no: 'C',
    icon: Sparkles,
    title: 'AI 工作流',
    en: 'AI WORKFLOW',
    copy: '将生成式图像、声音与自动化工具融入制作，提高素材探索与交付效率。',
  },
  {
    no: 'D',
    icon: MousePointer2,
    title: '内容落地',
    en: 'DELIVERY',
    copy: '理解平台语境与商业目标，快速匹配风格、修改反馈并完成稳定交付。',
  },
];
function Logo() {
  return (
    <a className="logo" href="#top" aria-label="回到首页">
      <span className="logo-mark"><i /><i /></span>
      <span>CHQ<small>VISUAL EDITOR</small></span>
    </a>
  );
}

function SectionTicker() {
  return (
    <div className="work-transition" aria-hidden="true">
      <div className="work-transition-track">
        {[0, 1].map((loop) => (
          <div className="work-transition-group" key={loop}>
            <span>SELECTED VIDEO WORK</span><i />
            <span>FOUR DISTINCT SERIES</span><i />
            <span>STORY · RHYTHM · MOTION</span><i />
            <span>SELECTED VIDEO WORK</span><i />
            <span>FOUR DISTINCT SERIES</span><i />
            <span>STORY · RHYTHM · MOTION</span><i />
          </div>
        ))}
      </div>
    </div>
  );
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('bilibili');
  const [activeProjectPage, setActiveProjectPage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const focusLine = window.innerHeight * 0.45;
      let current = 0;
      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= focusLine) current = index;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject || menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject, menuOpen]);

  const openProject = (project) => setActiveProject(project);
  const changeCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveProjectPage(0);
  };
  const navigateToSection = (index) => {
    setActiveSection(index);
    document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const visibleProjects = projects.filter((project) => project.category === activeCategory);

  return (
    <main>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="主导航">
            <a href="#work"><span>01</span>作品</a>
            <a href="#skills"><span>02</span>能力</a>
            <a href="#about"><span>03</span>经历</a>
          </nav>
          <a className="contact-pill" href="#contact">联系合作 <ArrowUpRight size={17} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="打开菜单"><Menu /></button>
        </div>
      </header>

      <aside className={`portfolio-line-sidebar ${activeSection >= 1 && activeSection <= 3 ? 'on-light' : 'on-dark'}${activeProject || menuOpen ? ' is-hidden' : ''}`}>
        <LineSidebar
          items={sidebarItems}
          activeIndex={activeSection}
          accentColor="#a98cff"
          textColor="#847d91"
          markerColor="#4b4556"
          maxShift={48}
          markerLength={102}
          itemGap={57}
          fontSize={2.1}
          smoothing={115}
          onItemClick={navigateToSection}
        />
      </aside>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-fallback" />
          <AeroShards
            className="hero-aero-shards"
            backgroundColor="#100d16"
            shardColor="#8f76bd"
            accentColor="#a855f7"
            placement="full"
            flow="stream"
            material="pearl"
            detail="fine"
            effect="none"
            scale={1.04}
            spread={1.35}
            depth={1.35}
            speed={0.58}
            spin={1}
            interaction="repel"
            density={1.55}
            shardSize={0.82}
            stretch={1.08}
            turbulence={1.08}
            glow={0.92}
            edgeSoftness={2}
            bloom={0.52}
            grain={0.05}
            chromaticAberration={0.0075}
            transitionDuration={1}
            interactionRadius={1.35}
            interactionStrength={0.45}
            rippleIntensity={0.7}
            holdToGather
          />
          {siteConfig.heroVideo && (
            <video autoPlay muted loop playsInline poster="/media/hero-poster.svg">
              <source src={siteConfig.heroVideo} type="video/mp4" />
            </video>
          )}
          <div className="hero-grid" />
          <div className="hero-vignette" />
        </div>

        <div className="container hero-content">
          <div className="hero-title-wrap">
            <div className="hero-title-kicker"><span>VIDEO EDITOR</span><i /> STORY · RHYTHM · MOTION</div>
            <h1>
              <span className="hero-title-first">剪辑不只是拼接</span>
              <span className="hero-title-row">
                <em>而是</em>
                <strong>重构感受</strong><b>。</b>
              </span>
            </h1>
          </div>

          <a className="hero-scroll-hint" href="#work" aria-label="下滑查看更多内容">
            <span>下滑查看更多</span>
            <ChevronDown size={20} strokeWidth={1.4} />
          </a>
        </div>
      </section>

      <SectionTicker />


      <section className="work section" id="work">
        <div className="container">
          <div className="section-head work-head">
            <div className="eyebrow"><span>01</span> SELECTED WORK / 视频作品</div>
          </div>
          <div className="work-title-row">
            <h2>VIDEO<br /><span>WORKS</span></h2>
            <span className="work-asterisk">✳</span>
          </div>

          <div className="project-categories" role="tablist" aria-label="作品分类">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={activeCategory === category.id ? 'is-active' : ''}
                onClick={() => changeCategory(category.id)}
                role="tab"
                aria-selected={activeCategory === category.id}
              >
                <span>{category.en}</span>
                {category.label}
                <small>{String(projects.filter((project) => project.category === category.id).length).padStart(2, '0')}</small>
              </button>
            ))}
          </div>

          <nav
            className="project-pagination"
            aria-label={`${projectCategories.find((category) => category.id === activeCategory)?.label}视频切换`}
          >
            <span>选择作品</span>
            <div>
              {visibleProjects.map((project, index) => (
                <button
                  key={project.id}
                  className={activeProjectPage === index ? 'is-active' : ''}
                  onClick={() => setActiveProjectPage(index)}
                  aria-label={`查看第${index + 1}条视频：${project.title}`}
                  aria-current={activeProjectPage === index ? 'true' : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </nav>

          <div
            className="project-list"
            key={`${activeCategory}-${activeProjectPage}`}
          >
            {visibleProjects
              .slice(activeProjectPage, activeProjectPage + 1)
              .map((project) => (
              <article className={`project-card theme-${project.theme}`} key={project.id}>
                <GlowCard className="project-glow" intensity={0.48} radius={26} fillOpacity={0.1}>
                  <button className="project-image" onClick={() => openProject(project)} aria-label={`预览${project.title}`}>
                    <img src={project.image} alt={`${project.title}项目封面`} />
                    <span className="image-grid" />
                    <span className="project-corner top-left">{project.index}</span>
                    <span className="project-corner top-right">{project.year}</span>
                    <span className="project-play"><Play fill="currentColor" /></span>
                    <span className="project-hover-label">OPEN CASE <ArrowUpRight size={17} /></span>
                  </button>
                  <div className="project-meta">
                    <div>
                      <p>{project.subtitle}</p>
                      <h3>
                        <span className="project-title-main">{project.title}</span>
                        {project.titleNote && <span className="project-title-note">{project.titleNote}</span>}
                      </h3>
                    </div>
                    <button onClick={() => openProject(project)}>VIEW PROJECT <ArrowUpRight size={17} /></button>
                  </div>
                </GlowCard>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionTicker />

      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span>02</span> CAPABILITIES / 个人优势</div>
          </div>
          <div className="skills-intro">
            <div className="intro-number" aria-hidden="true"><span>02</span><small>CAPABILITY</small></div>
            <h2><span>可靠地执行，</span><strong>敏锐地掌控节奏。</strong></h2>
            <p><b>不只完成画面</b>，也理解内容为什么被观看。<br />从创意讨论到最终交付，让每个环节紧密衔接。</p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ no, icon: Icon, title, en, copy }) => (
              <article className="capability-card" key={no}>
                <div className="cap-top"><span>[ {no} ]</span><Icon /></div>
                <div>
                  <small>{en}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <div className="cap-meta"><ArrowUpRight size={16} /></div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <SectionTicker />

      <section className="about section" id="about">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span>03</span> EXPERIENCE / 经历</div>
          </div>

          <div className="about-lead">
            <div className="about-stamp" aria-hidden="true">
              <span>EDITOR</span><b>CHQ</b><span>MOTION</span>
            </div>
            <div className="about-lead-copy">
              <p className="about-kicker">EDITING AS COMMUNICATION</p>
              <h2>
                <span className="about-line about-line-top">把复杂信息</span>
                <span className="about-line about-line-focus"><em>剪成</em><strong>值得看完</strong><i>的内容。</i></span>
              </h2>
            </div>
            <p className="about-summary"><b>3.5 YEARS / VIDEO EDITOR</b>拥有 3.5 年视频制作经验，覆盖知识科普、个人 IP、品牌商业与游戏内容。擅长以后期视角前置参与策划，让每一次剪辑都服务于内容表达与传播结果。</p>
          </div>

          <div className="about-grid">
            <aside className="profile-card">
              <div>
                <p className="mini-label">BASIC INFORMATION</p>
                <h3>陈海旗<small>VIDEO EDITOR</small></h3>
              </div>
              <dl>
                <div><dt><MapPin size={15} />所在地</dt><dd>厦门 · 湖里区</dd></div>
                <div><dt><Phone size={15} />电话</dt><dd><a href="tel:18460348419">184 6034 8419</a></dd></div>
                <div><dt><Mail size={15} />邮箱</dt><dd><a href="mailto:473572344@qq.com">473572344@qq.com</a></dd></div>
              </dl>
              <a className="text-link" href="#contact">发起合作 <ArrowUpRight size={16} /></a>
            </aside>

            <div className="timeline">
              <div className="timeline-title"><span>工作经历</span><small>EXPERIENCE / 2022—NOW</small></div>
              {experience.map((item, idx) => (
                <article className="timeline-item" key={item.period + item.company}>
                  <span className="timeline-no">0{idx + 1}</span>
                  <div className="timeline-date">{item.period}</div>
                  <div className="timeline-main">
                    <h3>{item.company}</h3>
                    <p className="timeline-role">{item.role}</p>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
              <article className="education-row">
                <span>EDU</span><div><b>数字媒体应用技术</b><small>江西制造职业技术学院 · 2020—2022</small></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <SectionTicker />

      <footer className="contact" id="contact">
        <div className="contact-noise" />
        <div className="container contact-inner">
          <div className="contact-top">
            <div className="eyebrow light"><span>04</span> CONTACT / 联系合作</div>
            <span>BASED IN XIAMEN<br />AVAILABLE REMOTELY</span>
          </div>
          <div className="contact-main">
            <p>有项目，或只是想聊聊？</p>
            <h2>LET’S MAKE<br /><span>SOMETHING</span> MOVE.</h2>
            <div className="contact-actions">
              <a href="mailto:473572344@qq.com" className="mail-button">
                <span>发送邮件</span>
                <small>473572344@qq.com</small>
                <ArrowUpRight />
              </a>
              <a href="tel:18460348419" className="mail-button">
                <span>联系电话（同微信）</span>
                <small>18460348419</small>
                <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="contact-bottom">
            <Logo />
            <div className="footer-links">
              <a href="tel:18460348419">PHONE <ExternalLink size={13} /></a>
              <a href="#top">BACK TO TOP ↑</a>
            </div>
            <p>© 2026 CHEN HAIQI<br />ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      {activeProject && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title}作品预览`} onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(null)}>
          <div className="modal-panel">
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭"><X /></button>
            <div className="modal-media">
              {activeProject.bilibili ? (
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${activeProject.bilibili}&page=1&high_quality=1&danmaku=0&autoplay=1`}
                  title={`${activeProject.title} 在线播放`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : activeProject.video ? (
                <video src={activeProject.video} controls autoPlay poster={activeProject.image} />
              ) : (
                <div className="video-placeholder">
                  <img src={activeProject.image} alt="项目封面" />
                  <div><Play size={32} /><p>视频待上传</p><span>在 src/portfolio.js 中填入视频路径即可在线播放</span></div>
                </div>
              )}
            </div>
            <div className="modal-info">
              <div><span>{activeProject.index} / {activeProject.year}</span><h2>{activeProject.title}</h2></div>
              <div><p>{activeProject.description}</p><small>{activeProject.role}</small></div>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} aria-label="关闭菜单"><X /></button>
          <Logo />
          <nav>
            <a href="#work" onClick={() => setMenuOpen(false)}><span>01</span>视频作品</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}><span>02</span>个人优势</a>
            <a href="#about" onClick={() => setMenuOpen(false)}><span>03</span>个人经历</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}><span>04</span>联系合作</a>
          </nav>
        </div>
      )}
    </main>
  );
}

export default App;


















