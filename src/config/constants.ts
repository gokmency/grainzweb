
export const CONFIG = {
  emails: {
    contact: ['byuzguc@gmail.com', 'bgokmence@gmail.com', 'grainzguild@gmail.com'],
    formSubmitEndpoint: 'https://formsubmit.co/',
  },
  socials: {
    twitter: 'https://x.com/grainzeth',
    linkedin: '', // Add if available
  },
  links: {
    grainzLegacy: 'https://grainzlegacy.vercel.app/',
    joinTeamTypeform: 'https://form.typeform.com/to/wWliUJsu',
  },
  text: {
    heroTitle: {
      en: 'WE BUILD THINGS',
      tr: 'FİKİRLERİ İNŞA EDİYORUZ'
    },
    nav: {
      home: { en: 'Home', tr: 'Ana Sayfa' },
      contentHub: { en: 'Content Hub', tr: 'İçerik Merkezi' },
    },
    contentHub: {
      title: { en: 'Content Hub', tr: 'İçerik Merkezi' },
      description: { en: 'Explore the latest articles, insights, and news from GRAINZ.', tr: 'GRAINZ\'den en son makaleleri, içgörüleri ve haberleri keşfedin.' },
      searchPlaceholder: { en: 'Search articles', tr: 'Makale ara' },
      allArticles: { en: 'All Articles', tr: 'Tüm Makaleler' },
      loading: { en: 'Loading articles…', tr: 'Makaleler yükleniyor…' },
      error: { en: 'Articles couldn’t be loaded.', tr: 'Makaleler yüklenemedi.' },
      tryAgain: { en: 'Try again', tr: 'Tekrar dene' },
      noMatch: { en: 'No articles found matching your search.', tr: 'Aramanızla eşleşen makale bulunamadı.' },
      loadMore: { en: 'Load more', tr: 'Daha fazla yükle' },
      loadingMore: { en: 'Loading…', tr: 'Yükleniyor…' },
      noPostsYet: { en: 'No posts yet. Publish on Hashnode and they’ll show up here automatically.', tr: 'Henüz gönderi yok. Hashnode\'da yayınlayın, burada otomatik olarak görünecekler.' },
      minRead: { en: 'min read', tr: 'dk okuma' }
    },
    blogDetail: {
      loading: { en: 'Loading article…', tr: 'Makale yükleniyor…' },
      error: { en: 'Couldn’t load article', tr: 'Makale yüklenemedi' },
      tryAgain: { en: 'Try again', tr: 'Tekrar dene' },
      notFoundTitle: { en: 'Article not found', tr: 'Makale bulunamadı' },
      backToHub: { en: '← Back to Content Hub', tr: '← İçerik Merkezine Dön' },
      backToHubShort: { en: 'Back to Content Hub', tr: 'İçerik Merkezine Dön' },
      minRead: { en: 'min read', tr: 'dk okuma' },
      by: { en: 'By', tr: 'Yazar:' },
      share: { en: 'Share', tr: 'Paylaş' },
      relatedArticles: { en: 'Related Articles', tr: 'İlgili Makaleler' }
    },
    notFound: {
      title: { en: 'PAGE NOT FOUND', tr: 'SAYFA BULUNAMADI' },
      description: { en: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.", tr: 'Aradığınız sayfa mevcut değil veya taşınmış. Sizi tekrar yolunuza koyalım.' },
      goHome: { en: 'GO HOME', tr: 'ANA SAYFAYA GİT' },
      goBack: { en: 'GO BACK', tr: 'GERİ DÖN' },
      needHelp: { en: 'Need help? Contact us at', tr: 'Yardıma mı ihtiyacınız var? Bize ulaşın:' }
    },
    whatWeDo: {
      title: {
        en: 'WHAT WE DO',
        tr: 'NE YAPIYORUZ'
      },
      description: {
        en: 'We design, develop, and build innovative solutions while nurturing and managing vibrant communities that drive meaningful engagement and growth.',
        tr: 'Yenilikçi çözümler tasarlıyor, geliştiriyor ve inşa ediyoruz. Aynı zamanda anlamlı etkileşim ve büyüme sağlayan canlı toplulukları besliyor ve yönetiyoruz.'
      },
      mobileDescription: {
        en: 'We design, develop, and build innovative solutions while nurturing communities.',
        tr: 'Toplulukları beslerken yenilikçi çözümler tasarlıyor, geliştiriyor ve inşa ediyoruz.'
      },
    },
    workWithUs: {
      title: {
        en: 'WORK WITH US',
        tr: 'BİZİMLE ÇALIŞIN'
      },
    },
    whoWeAre: {
      title: {
        en: 'WHO WE ARE',
        tr: 'BİZ KİMİZ'
      },
    },
    workedWith: {
      title: {
        en: 'WORKED WITH',
        tr: 'BİRLİKTE ÇALIŞTIKLARIMIZ'
      },
    },
        buttons: {
      followUs: { en: 'FOLLOW US', tr: 'TAKİP EDİN' },
      contactUs: { en: 'CONTACT WITH US', tr: 'İLETİŞİME GEÇİN' },
      design: { en: 'Design', tr: 'Tasarım' },
      development: { en: 'Development', tr: 'Yazılım' },
      community: { en: 'Community', tr: 'Topluluk' },
      joinTeam: { en: 'Join our team', tr: 'Ekibimize katılın' },
    },
    toasts: {
      designComingSoon: { en: 'Design page coming soon!', tr: 'Tasarım sayfası çok yakında!' },
      developmentComingSoon: { en: 'Development page coming soon!', tr: 'Yazılım sayfası çok yakında!' },
      workingHard: { en: 'We are working hard to bring this page to life.', tr: 'Bu sayfayı hayata geçirmek için yoğun çalışıyoruz.' },
    },
    contactPopup: {
      title: { en: 'Contact With Us', tr: 'Bizimle İletişime Geçin' },
      description: { en: "Send us a message and we'll get back to you soon.", tr: 'Bize bir mesaj gönderin, en kısa sürede size dönüş yapacağız.' },
      successTitle: { en: 'Message Sent!', tr: 'Mesaj Gönderildi!' },
      successDescription: { en: "Your message has been sent successfully! We'll get back to you soon.", tr: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' },
      name: { en: 'Name', tr: 'İsim' },
      email: { en: 'Email', tr: 'E-posta' },
      message: { en: 'Message', tr: 'Mesaj' },
      cancel: { en: 'Cancel', tr: 'İptal' },
      send: { en: 'Send Message', tr: 'Mesaj Gönder' },
      sending: { en: 'Sending...', tr: 'Gönderiliyor...' },
      close: { en: 'Close', tr: 'Kapat' },
      error: { en: 'An error occurred while sending the message. Please try again later.', tr: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' }
    },
    copyright: {
      en: '© 2026 GRAINZ All rights reserved.',
      tr: '© 2026 GRAINZ Tüm hakları saklıdır.'
    },
  },
};

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Gökmen",
    role: "Developer",
    photo: "/team/gokmen.jpg",
    bio: {
      en: "After working as a community developer in crypto and blockchain projects, he now continues his path as a computer engineer. Not only does he turn his own ideas into products, but he also offers professional development services to clients.",
      tr: "Kripto ve blockchain projelerinde topluluk geliştiricisi olarak çalıştıktan sonra, artık bilgisayar mühendisi olarak yoluna devam ediyor. Kendi fikirlerini ürüne dönüştürmekle kalmıyor, dışarıya da profesyonel geliştirme hizmeti sunuyor."
    },
    twitter: "https://x.com/gokmeneth",
    linkedin: "https://www.linkedin.com/in/gokmencelik/",
    website: "https://gokmens.com"
  },
  {
    id: 3,
    name: "Sefercan",
    role: "Researcher",
    photo: "/team/sefercan.jpg",
    bio: {
      en: "While studying medicine, he also supports and consults on development processes for the team's projects and sectoral ventures. Don't let his medical background fool you—his tech knowledge and vision easily outpace most \"tech-focused\" folks.",
      tr: "Bir yandan tıp okuyor, diğer yandan ekibin projelerinde ve sektörel girişimlerinde geliştirme süreçlerine destek olup danışmanlık veriyor. Asıl mesleğinin tıp olmasına bakmayın, teknoloji bilgisi ve vizyonuyla çoğu \"teknoloji odaklı\" insanı cebinden çıkarır."
    },
    twitter: "https://x.com/sefercan"
  },
  {
    id: 6,
    name: "Ercan",
    role: "Researcher",
    photo: "/team/ercan.jpg",
    bio: {
      en: "While pursuing his medical education, he plays an active role in the team's tech-focused work and sectoral initiatives, lending a hand in shaping processes through his research.",
      tr: "Tıp eğitimini sürdürürken, ekibin teknoloji odaklı çalışmalarında ve sektörel girişimlerinde aktif rol alıyor. Araştırmalarıyla süreçlerin şekillenmesine omuz veriyor."
    },
    twitter: "https://x.com/ercan"
  },
  {
    id: 4,
    name: "Maslak",
    role: "Analyst",
    photo: "/team/maslak.jpg",
    bio: {
      en: "Approaching business processes with an industrial engineering background, he designs all operations and workflows systematically by the book, aiming for maximum efficiency.",
      tr: "İş süreçlerini endüstri mühendisliği altyapısıyla ele alıyor; tüm operasyonları ve akışları tamamen kitabına uygun, sistemli bir şekilde kurgulayarak maksimum verimliliği hedefliyor."
    },
    twitter: "https://x.com/maslak"
  },
  {
    id: 5,
    name: "Burak",
    role: "Designer",
    photo: "/team/burak.jpg",
    bio: {
      en: "Leading modeling and interface processes with an industrial design background, he is a master at turning the product in your mind into a tangible prototype or manufacturing it from scratch in no time.",
      tr: "Endüstriyel tasarım altyapısıyla modelleme ve arayüz süreçlerine liderlik ediyor. Aklınızdaki ürünü en kısa sürede elle tutulur bir prototipe dönüştürme veya sıfırdan üretme konusunda usta."
    },
    twitter: "https://x.com/100guc",
    linkedin: "https://www.linkedin.com/in/burakyuzguc",
    website: "https://burakyuzguc.vercel.app"
  },
  {
    id: 2,
    name: "Akman",
    role: "Researcher",
    photo: "/team/berkay.jpg",
    bio: {
      en: "Despite being an intern doctor, he makes time to work with the team amidst his hectic schedule. By researching tech trends and actively supporting development processes for ventures, he remains one of the hidden powerhouses behind the projects.",
      tr: "Stajyer doktor olmasına rağmen yoğun temposunun içinde ekiple birlikte çalışmaya vakit ayırıyor. Teknoloji trendlerini araştırarak ve girişimlerin geliştirme süreçlerine aktif destek vererek projelerin arkasındaki gizli güçlerden biri oluyor."
    },
    twitter: "https://x.com/Akmangrainz"
  },
  {
    id: 7,
    name: "Ceyhun",
    role: "Intern",
    photo: "/team/ceyhun.jpg",
    bio: {
      en: "The face of the team who handles initial client communications and boasts the highest sales potential. He might be new to the crew, but his persuasion skills already position him to achieve big things.",
      tr: "Müşterilerle ilk iletişimi kuran, takımın yüzü ve satış potansiyeli en yüksek ismi. Ekibe yeni katılmış olabilir ama ikna kabiliyetiyle şimdiden büyük işler başarmaya aday."
    },
    twitter: "https://x.com/grainzeth"
  },
];
