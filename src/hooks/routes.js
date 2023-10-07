const BASE_URL = 'https://test.thesalear.com/api/'

const ROUTES = {
    addUser:'Authentication/signup',
    getUsers:'user/getusers',
    login:'Authentication/login',
    getChatting:'Chatting/getunique',
    getTwoPersonsChatting:'Chatting/getunique',
    AddChatting:'Chatting/addChatting'
 
}

const METHOD = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
}

export { BASE_URL, ROUTES, METHOD }