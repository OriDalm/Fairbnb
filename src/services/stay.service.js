// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const stay = {
  _id: 's101',
  name: 'Ribeira Charming Duplex',
  type: 'House',
  imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
  price: 80.0,
  summary: 'Fantastic duplex apartment...',
  capacity: 8,
  amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
  labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
  host: {
    _id: 'u101',
    fullname: 'Davit Pok',
    imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
  },
  loc: {
    country: 'Portugal',
    countryCode: 'PT',
    city: 'Lisbon',
    address: '17 Kombo st',
    lat: -8.61308,
    lng: 41.1413,
  },
  reviews: [
    {
      id: 'madeId',
      txt: 'Very helpful hosts. Cooked traditional...',
      rate: 4,
      by: {
        _id: 'u102',
        fullname: 'user2',
        imgUrl: '/img/img2.jpg',
      },
    },
  ],
  likedByUsers: ['mini-user'],
}

const orders = [
  {
    _id: 'o1225',
    hostId: 'u102',
    buyer: {
      _id: 'u101',
      fullname: 'User 1',
    },
    totalPrice: 160,
    startDate: '2025/10/15',
    endDate: '2025/10/17',
    guests: {
      adults: 1,
      kids: 2,
    },
    stay: {
      _id: 'h102',
      name: 'House Of Uncle My',
      price: 80.0,
    },
    msgs: [],
    status: 'pending', // approved, rejected
  },
]

const users = [
  {
    _id: 'u101',
    fullname: 'User 1',
    imgUrl: '/img/img1.jpg',
    username: 'user1',
    password: 'secret',
  },
  {
    _id: 'u102',
    fullname: 'User 2',
    imgUrl: '/img/img2.jpg',
    username: 'user2',
    password: 'secret',
  },
]
// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering

// Example - figuring up if the user is an owner:
// userService.login()
//  const userStays = stayService.query({ownerId: loggeinUser._id})
//  loggeinUser.isOwner = userStays.length > 0

const STORAGE_KEY = 'stay'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getDefaultFilter,
}
window.cs = stayService

async function query(filterBy = {}) {
  // console.log(filterBy);
  return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
  return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await httpService.put(`stay/${stay._id}`, stay)
  } else {
    savedStay = await httpService.post('stay', stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
  return savedMsg
}

function getEmptyStay() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

function getDefaultFilter() {
  return { country: '', labels: '',minPrice:0,maxPrice:2600,capacity:''}
}
