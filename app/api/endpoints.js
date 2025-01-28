import { baseAddress } from "../../config"


const authEnpoint = baseAddress + "/mindyback/v1/auth"

const othersBase = baseAddress + "/mindyback/v1/api"


export const loginEndpoint = authEnpoint + "/signin"



const lessonsEndpoint = othersBase + "/lecons"


export const createLessonEndpoint = lessonsEndpoint + "/createLecons"
export const findLessonEndpoint = (id) => lessonsEndpoint + `/findById/${id}`



const gameEndpoint = othersBase + "/games"



export const createGameByLessonId = gameEndpoint + `/createByLeconId`
export const createScenarioEndpoint = (id) => gameEndpoint + `/scenario/createbylecon/${id}`
export const createCommunicationEndpoint = (id) => gameEndpoint + `/communication/createbylecon/${id}`



export const correctionEndpoint = (id) =>  othersBase + `/corrections/corrigegame/${id}`

const ImageEndpoint = othersBase + "/images"


export const getImageEndpoint = ImageEndpoint + "/find"



const skillsEndpoint = othersBase + "/competences"


export const allSkillsEndpoint = skillsEndpoint + "/findAllByUserId"


const chaptersEndpoint = othersBase + "/chapters"


export const allChaptersEndpoint = (id) => chaptersEndpoint + `/findAllCompetence/${id}`

export const validateChapterEndpoint = (id) => chaptersEndpoint + `/validateChapter/${id}`

export const updateCurrentChapterEndpoint = () => chaptersEndpoint + `/updateChapterCurrent/${id}`


