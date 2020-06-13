import { useState, useEffect, useDebugValue } from 'react'
    

const useFetch = (url) => {
    
    const [data, setData] = useState({ data: null, loading: true });
    useEffect(() => {
        const f = async () => {
            const query = {
                query: `query{
                        events{
                          _id
                          description
                          date
                          title
                          price
                          creator{
                            username
                            email
                          }
                        }
                      }
                    `,
            };
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(query)
            });
            if (response.ok){
                const resData = await response.json();
                setData({data :resData.data.events , loading:false})
               
            }
        }
        f();
    },[url])
    console.log(data)
    return data
}

export default useFetch