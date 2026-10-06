export interface ChurchInfo {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  pastorName: string;
  pastorTitle: string;
  pastorBio: string;
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
}

export const churchData: ChurchInfo = {
  name: "UNITED PENTECOSTAL CHURCH",
  shortName: "UPC",
  tagline: "NO ONE SHOULD WALK THROUGH LIFE ALONE",
  subTagline: "Discover your people, place, and purpose in God's presence.",
  pastorName: "Pastor Rajan Joel",
  pastorTitle: "Lead Pastor",
  pastorBio: `We believe that God has an extraordinary purpose for every single person. In early days, we sensed God's clear calling to build a life-giving, spirit-empowered, Bible-believing family. Our dream is to see broken hearts healed, families restored, and our community transformed by the unconditional love and power of Jesus Christ. Whether you have questions about faith or are looking for a spiritual home, you are always welcome here!`,
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
    email: "contact@upcchurch.org",
    phone: "+1 (800) 555-0199"
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
  ]
};
