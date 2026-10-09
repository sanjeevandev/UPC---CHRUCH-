export interface ChurchInfo {
  name: string;
  shortName: string;
  logo: string;
  tagline: string;
  subTagline: string;
  pastorName: string;
  pastorTitle: string;
  pastorImage: string;
  pastorBio: string;
  youthLeader: {
    name: string;
    title: string;
    image: string;
    tagline: string;
    bio: string;
    gatheringTime: string;
  };
  location: {
    address: string;
    cityState: string;
    googleMapsUrl: string;
    parkingInfo: string;
    landmark: string;
  };
  serviceTimes: {
    title: string;
    day: string;
    time: string;
    note: string;
    badge?: string;
  }[];
  socials: {
    instagram: string;
    youtube: string;
    email: string;
    phone: string;
    whatsappNumber: string;
  };
  marqueeItems: string[];
  ministries: {
    title: string;
    description: string;
    image: string;
    category: string;
  }[];
  latestSermon: {
    title: string;
    series: string;
    speaker: string;
    date: string;
    videoId: string;
    videoUrl: string;
    youtubeWatchUrl: string;
    thumbnail: string;
    duration: string;
    description: string;
    channelUrl: string;
    recentMessages: {
      id: string;
      title: string;
      thumbnail: string;
    }[];
  };
  prayerCategories: {
    id: string;
    name: string;
    description: string;
  }[];
  dailyPromises: {
    id: number;
    reference: string;
    referenceTamil: string;
    textEnglish: string;
    textTamil: string;
    theme: string;
    themeTamil: string;
  }[];
}

export const churchData: ChurchInfo = {
  name: "UNITED PENTECOSTAL CHURCH",
  shortName: "UPC",
  logo: "/upc-logo.jpg",
  tagline: "NO ONE SHOULD WALK THROUGH LIFE ALONE",
  subTagline: "Discover your people, place, and purpose in God's presence.",
  pastorName: "Pastor Rajan Joel",
  pastorTitle: "Lead Pastor",
  pastorImage: "/pastor-rajan-joel.jpg",
  pastorBio: `We believe that God has an extraordinary purpose for every single person. In early days, we sensed God's clear calling to build a life-giving, spirit-empowered, Bible-believing family. Our dream is to see broken hearts healed, families restored, and our community transformed by the unconditional love and power of Jesus Christ. Whether you have questions about faith or are looking for a spiritual home, you are always welcome here!`,
  youthLeader: {
    name: "Bro. Goodwin",
    title: "Youth Ministry Leader",
    image: "/youth-leader-goodwin.jpg",
    tagline: "UPC BODI YOUTH • IGNITING PASSION & PURPOSE",
    bio: `At UPC Bodi Youth, we are passionate about raising a bold, spirit-filled, and purpose-driven generation of young people. Our mission is to provide an empowering, safe space where students and young adults discover their identity in Christ, cultivate authentic friendships, and step courageously into their God-given destiny. Come worship with us, grow together, and be a light to the world!`,
    gatheringTime: "Every Sunday at 1:00 PM – 2:00 PM",
  },
  location: {
    address: "United Pentecostal Church Sanctuary",
    cityState: "Bodi Campus (Click for Directions)",
    googleMapsUrl: "https://maps.app.goo.gl/UdonX2UpNLX8pDzf6",
    parkingInfo: "Free dedicated parking available on campus with friendly guest greeting team",
    landmark: "Conveniently accessible near main road"
  },
  serviceTimes: [
    {
      title: "Early Morning Service",
      day: "Every Sunday",
      time: "5:30 AM – 7:00 AM",
      note: "Early morning prayer, devotion & anointing gathering",
      badge: "Dawn Gathering"
    },
    {
      title: "Main Morning Worship Service",
      day: "Every Sunday",
      time: "9:00 AM – 12:30 PM",
      note: "Full spirit-filled praise, powerful worship & anointed preaching",
      badge: "Main Service"
    },
    {
      title: "Children's Sunday Class",
      day: "Every Sunday",
      time: "10:30 AM – 11:50 AM",
      note: "Fun, engaging Bible teaching, songs & activities for kids",
      badge: "Kids Kingdom"
    },
    {
      title: "Youth Prayer Fellowship",
      day: "Every Sunday",
      time: "1:00 PM – 2:00 PM",
      note: "Dynamic prayer, empowerment & encouragement for young people",
      badge: "Youth"
    },
    {
      title: "Women's Prayer Fellowship",
      day: "Every Sunday",
      time: "1:00 PM – 2:00 PM",
      note: "Sisters in Christ interceding for families, church & community",
      badge: "Women"
    }
  ],
  socials: {
    instagram: "https://www.instagram.com/upc_church_bodi/",
    youtube: "https://www.youtube.com/@UnitedpentecostalchurchBODI",
    email: "upcbodi@gmail.com",
    phone: "+91 80569 69614",
    whatsappNumber: "918056969614"
  },
  marqueeItems: [
    "WE CAN'T WAIT TO MEET YOU!",
    "SUNDAY SERVICES: 5:30 AM & 9:00 AM!",
    "CHILDREN'S SUNDAY CLASS: 10:30 AM – 11:50 AM!",
    "YOUTH & WOMEN'S PRAYER: 1:00 PM – 2:00 PM!",
    "FOLLOW US ON INSTAGRAM @upc_church_bodi",
    "WATCH US ON YOUTUBE @UnitedpentecostalchurchBODI",
    "WELCOME HOME TO UPC!"
  ],
  ministries: [
    {
      title: "Children's Sunday Class",
      description: "Dedicated Sunday School from 10:30 AM to 11:50 AM with interactive Bible stories, moral lessons, and joy-filled worship.",
      image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
      category: "Every Sunday 10:30 AM"
    },
    {
      title: "Youth Prayer & Ministry",
      description: "Empowering the next generation with weekly youth prayer every Sunday at 1:00 PM for spiritual fire and purpose.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      category: "Every Sunday 1:00 PM"
    },
    {
      title: "Women's Prayer Fellowship",
      description: "United in powerful intercession every Sunday at 1:00 PM, praying for homes, breakthrough, and revival.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      category: "Every Sunday 1:00 PM"
    },
    {
      title: "Spirit-Filled Worship & Preaching",
      description: "Encounter God's presence during our Early Morning (5:30 AM) and Main Morning (9:00 AM) services led by Pastor Rajan Joel.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      category: "Sunday 5:30 AM & 9:00 AM"
    }
  ],
  latestSermon: {
    title: "Walking in Divine Authority & Supernatural Peace",
    series: "United Pentecostal Worship Series",
    speaker: "Pastor Rajan Joel",
    date: "Latest Sunday Message",
    videoId: "kfEMVZ8Yonc",
    videoUrl: "https://www.youtube-nocookie.com/embed/kfEMVZ8Yonc?autoplay=1",
    youtubeWatchUrl: "https://www.youtube.com/watch?v=kfEMVZ8Yonc",
    thumbnail: "https://img.youtube.com/vi/kfEMVZ8Yonc/hqdefault.jpg",
    duration: "Live Gathering",
    description: "Join Pastor Rajan Joel and the United Pentecostal family in spirit-filled praise, worship, and dynamic preaching from the Word of God.",
    channelUrl: "https://www.youtube.com/@UnitedpentecostalchurchBODI",
    recentMessages: [
      {
        id: "kfEMVZ8Yonc",
        title: "Sunday Celebration & Worship",
        thumbnail: "https://img.youtube.com/vi/kfEMVZ8Yonc/hqdefault.jpg"
      },
      {
        id: "Bjd15NkzjPA",
        title: "Spirit-Empowered Praise & Ministry",
        thumbnail: "https://img.youtube.com/vi/Bjd15NkzjPA/hqdefault.jpg"
      },
      {
        id: "iD3KIs-E0vU",
        title: "Midweek Prayer & Discipleship Word",
        thumbnail: "https://img.youtube.com/vi/iD3KIs-E0vU/hqdefault.jpg"
      },
      {
        id: "k1WWemoRBXc",
        title: "Special Anointing & Gospel Service",
        thumbnail: "https://img.youtube.com/vi/k1WWemoRBXc/hqdefault.jpg"
      }
    ]
  },
  prayerCategories: [
    {
      id: "healing",
      name: "Physical Healing & Health",
      description: "Praying for bodily recovery, freedom from illness, and strength."
    },
    {
      id: "family",
      name: "Family, Marriage & Children",
      description: "Restoration, unity, protection, and blessing in home and relationships."
    },
    {
      id: "spiritual",
      name: "Spiritual Growth & Deliverance",
      description: "Deeper intimacy with Christ, peace, freedom, and renewed faith."
    },
    {
      id: "breakthrough",
      name: "Career, Employment & Miracle",
      description: "Open doors, financial provision, wisdom in decisions, and divine direction."
    },
    {
      id: "praise",
      name: "Praise Report & Thanksgiving",
      description: "Celebrating answered prayers and the faithfulness of God in your life."
    }
  ],
  dailyPromises: [
    {
      id: 1,
      reference: "Isaiah 41:10",
      referenceTamil: "ஏசாயா 41:10",
      theme: "Divine Strength & Protection",
      themeTamil: "தெய்வீக பெலன் & பாதுகாப்பு",
      textEnglish: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
      textTamil: "பயப்படாதே, நான் உன்னுடனே இருக்கிறேன்; திகையாதே, நான் உன் தேவன்; நான் உன்னைப் பலப்படுத்தி உனக்குச் சகாயம்பண்ணுவேன்; என் நீதியின் வலதுகரத்தினால் உன்னைத் தாங்குவேன்."
    },
    {
      id: 2,
      reference: "Jeremiah 29:11",
      referenceTamil: "எரேமியா 29:11",
      theme: "Hope & Future",
      themeTamil: "நம்பிக்கை & எதிர்காலம்",
      textEnglish: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      textTamil: "நீங்கள் எதிர்பார்த்திருக்கும் முடிவை உங்களுக்குக் கொடுக்கும்படிக்கு நான் உங்கள்பேரில் நினைத்திருக்கிற நினைவுகளை அறிவேன் என்று கர்த்தர் சொல்லுகிறார்; அவைகள் தீமைக்கல்ல, சமாதானத்துக்கேதுவான நினைவுகளே."
    },
    {
      id: 3,
      reference: "Philippians 4:13",
      referenceTamil: "பிலிப்பியர் 4:13",
      theme: "Victory Through Christ",
      themeTamil: "கிறிஸ்துவுக்குள் வெற்றி",
      textEnglish: "I can do all things through Christ who strengthens me.",
      textTamil: "என்னைப் பெலப்படுத்துகிற கிறிஸ்துவினாலே எல்லாவற்றையுஞ்செய்ய எனக்குப் பெலனுண்டு."
    },
    {
      id: 4,
      reference: "Psalm 23:1",
      referenceTamil: "சங்கீதம் 23:1",
      theme: "The Lord is My Shepherd",
      themeTamil: "கர்த்தர் என் மேய்ப்பர்",
      textEnglish: "The LORD is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters.",
      textTamil: "கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன். அவர் என்னைப் புல்லுள்ள இடங்களில் படுக்கப்பண்ணி, அமர்ந்த தண்ணீர்கள் அண்டையில் என்னைக் கொண்டுபோய் விடுகிறார்."
    },
    {
      id: 5,
      reference: "Matthew 11:28",
      referenceTamil: "மத்தேயு 11:28",
      theme: "Rest for the Weary",
      themeTamil: "இளைப்பாறுதல்",
      textEnglish: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me.",
      textTamil: "வருத்தப்பட்டுப் பாரஞ்சுமக்கிறவர்களே! நீங்கள் எல்லாரும் என்னிடத்தில் வாருங்கள்; நான் உங்களுக்கு இளைப்பாறுதல் தருவேன்."
    },
    {
      id: 6,
      reference: "Joshua 1:9",
      referenceTamil: "யோசுவா 1:9",
      theme: "Courage & Faith",
      themeTamil: "தைரியமும் விசுவாசமும்",
      textEnglish: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      textTamil: "நான் உனக்குக் கட்டளையிடவில்லையா? பலங்கொண்டு திடமனதாயிரு; திகையாதே, கலங்காதே, நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்."
    },
    {
      id: 7,
      reference: "John 14:27",
      referenceTamil: "யோவான் 14:27",
      theme: "Supernatural Peace",
      themeTamil: "தெய்வீக சமாதானம்",
      textEnglish: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      textTamil: "சமாதானத்தை உங்களுக்கு வைத்துப்போகிறேன், என்னுடைய சமாதானத்தையே உங்களுக்குக் கொடுக்கிறேன்; உலகம் கொடுக்கிறபிரகாரம் நான் உங்களுக்குக் கொடுக்கிறதில்லை. உங்கள் இருதயம் கலங்காமலும் பயப்படாமலும் இருப்பதாக."
    }
  ]
};
