import { useEffect, useState } from "react"
import { useFirebase } from "."

const useEntities = name => {
    const [entities, setEntities] = useState([])
    
    const { entities:getRef, onValue } = useFirebase()

    const ref = getRef(name)

    useEffect(() => {    
        const listener = onValue(ref,snapshot => {
            const obj = snapshot.val()
            
            const list = obj ? Object.keys(obj).map(key => ({
                ...obj[key], uid: key,
            })) : []

            setEntities(list)
        })

        return listener
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return entities
}

export default useEntities