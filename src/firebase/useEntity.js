import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useFirebase } from "."

const useEntity = name => {
    const [entity, setEntity] = useState(null)
    
    const {entity:getRef, onValue} = useFirebase()
    
    const { uid } = useParams()

    const ref = getRef(uid,name) 
    
    useEffect(() => {    
        const listener = onValue(ref, snapshot => {
            setEntity({...snapshot.val(), uid})
        })

        return listener
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return entity
}

export default useEntity