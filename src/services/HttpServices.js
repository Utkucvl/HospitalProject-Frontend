// All Request methods 

export const PostRequest = (url,body) =>{
    var request = fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body),
      })
      return request
}

export const UpdateReport = (url,body) => {
    var request = fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body),
      })
      return request
}

export const GetRequest= (url) =>{
    var request = fetch(url, {
        method: "GET",
       headers:{
        "Content-type": "application/json"
       },
      })
      return request
}
export const DeleteReport = (url) =>{
    var request = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
      })
      return request
}