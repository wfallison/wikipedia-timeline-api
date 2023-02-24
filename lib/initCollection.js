import { createTimelineCollection, deleteAllTimelineCollections, getAllTimeLineCollections } from './mongoConn.js';

const westCoastStates = {
  collectionName: "American West Coast States",
  collectionItems:[
    {"articleTitle":"Oregon"}, 
    {"articleTitle":"California"}, 
    {"articleTitle": "Washington (state)"}, 
    {"articleTitle": "Alaska"}
  ]
}

const superContinents = {
  collectionName: "Super Continents",
  collectionItems:[
    {"articleTitle": "Pangaea"},
    {"articleTitle": "Rodinia"},
    {"articleTitle": "Columbia (supercontinent)"},
    {"articleTitle": "Gondwana"},
    {"articleTitle": "Pannotia"},
    {"articleTitle": "Ur (continent)"},
    {"articleTitle": "Vaalbara"},
    {"articleTitle": "Atlantica"},
    {"articleTitle": "Nena (supercontinent)"}
  ]
}


const abolishionists = {
  collectionName: "Abolishionists",
  collectionItems:[
    {"articleTitle": "Frederick Douglass"},
    {"articleTitle": "William Lloyd Garrison"},
    {"articleTitle": "Angelina Grimké"},
    {"articleTitle": "John Brown (abolitionist)"},
    {"articleTitle": "Harriet Beecher Stowe"}
  ]
}


const liberationists = {
  collectionName: "Liberators",
  collectionItems:[
    {"articleTitle": "Sir Walter Riley"},
    {"articleTitle": "Ida B. Wells"},
    {"articleTitle": "Madame C.J. Walker"},
    {"articleTitle": "Coretta Scott King"},
    {"articleTitle": "John Jewis (Congressman)"},
    {"articleTitle": "Sojourner Truth"},
    {"articleTitle": "Maryanne Anderson"},
    {"articleTitle": "George Washington Carver"},
    {"articleTitle": "Sir Francis Drake"}
  ]
}


try {
 await deleteAllTimelineCollections()
}
finally {
  await createTimelineCollection(westCoastStates)
  await createTimelineCollection(superContinents)
  await createTimelineCollection(abolishionists)
  await createTimelineCollection(liberationists)

  console.log(await getAllTimeLineCollections(0))
  
}

