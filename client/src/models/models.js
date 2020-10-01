const data={
  categories: [
    "Hospitality",
    "Health Care",
    "Housekeeping",
    "Construction",
    "Design",
    "IT",
    "Art",
    "Body Care",
    "Other"
  ],
  
  category: null,
  
  workers: [
    {
      id: 1,
      firstName: 'Pietro',
      lastName: 'Sassi',
      image: {
        img:"https://i.pinimg.com/280x280_RS/89/54/e2/8954e2f5c916342ace471568c636bf93.jpg",
        alt:"img Pietro"
      },
      address: {
        city: 'Perth'
      },
      contactDetail: {
        email: 'roccia88@gmail.com',
        phone: '0400000011',
        website: 'http://asdasd.com'
      },
      category: 'Body Care',
      jobTitle: 'Massaggiattore',
      skills: ['massaggi', 'recitazione'],
      availability: true
    },
    {
      id: 2,
      firstName: 'Maria',
      lastName: 'Maria',
      image: {
        img:"https://m.betootaadvocate.com/wp-content/uploads/2020/06/karen-karen.jpg",
        alt:"img Maria"
      },
      address: {
        city: 'Melbourne'
      },
      contactDetail: {
        email: 'maria@maria.com',
        phone: '0400000023',
        website: 'http://xxxxx'
      },
      category: "IT",
      jobTitle: 'computer',
      skills: ['programmo'],
      availability: true
    },
    {
      id: 3,
      firstName: 'Susanno',
      lastName: 'Maria',
      image: {
        img:"https://media.apnarm.net.au/media/images/2017/05/12/bogan_hunter-7lf5871yjoqcc6q38o2_fct650x395x58.0_ct1880x930.jpg",
        alt:"img Susanno"
      },
      address: {
        city: 'Brisbane'
      },
      contactDetail: {
        email: 'sus@brugola.com',
        phone: '0400000066',
        website: 'http://xxxxx'
      },
      category: "Housekeeping",
      jobTitle: 'Idraulico',
      skills: ['svito', 'avvito'],
      availability: true
    },
    {
      id: 4,
      firstName: 'Lorenzo',
      lastName: 'Del Rosario',
      image: {
        img:"https://pbs.twimg.com/profile_images/600332210076389376/nzn7ox7-_400x400.jpg",
        alt:"img Lorenzo"
      },
      address: {
        city: 'Sydney'
      },
      contactDetail: {
        email: 'lor@gmail.com',
        phone: '0400000000',
        website: 'http://xxxxx'
      },
      category: "Construction",
      jobTitle: 'Muratore',
      skills: ['cantieri di case', 'usare la ruspa'],
      availability: true
    },
    {
      id: 5,
      firstName: 'Mario',
      lastName: 'Mare',
      image: {
        img:"https://i.pinimg.com/originals/55/8e/24/558e24ed3fb3759f1b0dfc239ba03bca.jpg",
        alt:"img Mario"
      },
      address: {
      city: 'Sydney a mare'
      },
      contactDetail: {
        email: 'maro@gmail.com',
        phone: '0400000001',
        website: 'http://mare'
      },
      category: "Construction",
      jobTitle: 'Mariotore',
      skills: ['cantieri', 'usare la fresa', 'leading', 'martellare fortissimo' ],
      availability: false
    },
    {
      id: 6,
      firstName: 'Marco',
      lastName: 'Columbro',
      image: {
        img:"https://www.viagginews.com/wp-content/uploads/2019/10/Marco-Columbro.jpg",
        alt:"img Marco"
      },
      address: {
      city: 'Sydney a montagna'
      },
      contactDetail: {
        email: 'marco@gmail.com',
        phone: '0400000002',
        website: 'http://columbro.it'
      },
      category: "Hospitality",
      jobTitle: 'Cameriere',
      skills: ['Portare 4 piatti', 'lavoro veloce', 'questo', 'quello' ],
      availability: false
    },
    {
      id: 7,
      firstName: 'Aldo',
      lastName: 'Baglio',
      image: {
        img:"https://www.ilcentro.it/image/policy:1.1992547:1533939606/CAC-WEB.jpg?f=2x1&$p$f=ceedb53&w=1500&$w=f075b93",
        alt:"img Aldo"
      },
      address: {
      city: 'Castelvecchio (NSW)'
      },
      contactDetail: {
        email: 'ole@ola.com',
        phone: '0400000003',
        website: 'http://ab.it'
      },
      category: "Hospitality",
      jobTitle: 'Chef',
      skills: ['Cucino', 'So fare la carbonara', 'Leading', 'questo', 'quello' ],
      availability: true
    },
    {
      id: 8,
      firstName: 'Ajeje',
      lastName: 'Brazorf',
      image: {
        img:"https://www.dagospia.com/img/foto/01-2020/ajeje-brazorf-1-1265457.jpg",
        alt:"img Ajejeje"
      },
      address: {
      city: 'Castelnuovo (VIC)'
      },
      contactDetail: {
        email: 'ola@ole.com',
        phone: '0400000004',
        website: 'http://ab.com'
      },
      category: "Hospitality",
      jobTitle: 'Cuoco',
      skills: ['Cucino bene', 'So fare la gricia', 'Fast worker', 'taglio le cipolle', 'faccio la pizza' ],
      availability: false
    },
    {
      id: 9,
      firstName: 'Gengis',
      lastName: 'Khan',
      image: {
        img:"https://knowledgenuts.com/wp-content/uploads/2017/12/gengis-khan.jpg",
        alt:"img Gengis"
      },
      address: {
      city: 'Mongolia'
      },
      contactDetail: {
        email: 'faccio@bordello.com',
        phone: '0400000666',
        website: 'http://facciobordello.mn'
      },
      category: "Body Care",
      jobTitle: 'Estetista',
      skills: ['Sopraciglia con filo', 'Unghie', 'Extensions', 'Extension Ciglia', 'botox' ],
      availability: true
    },
  ]
}

export default data