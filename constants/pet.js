import images from "./images";

const petList = [
  images.pet1,
  images.pet2,
  images.pet3
]

export default getPet = (unitId) => {
  return petList[unitId % 3]
}