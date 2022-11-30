import { Button } from "react-bootstrap";
import { useSelector } from "react-redux"


const LoadingButton = ({title, onClick, variant}) => {
  const loadingData = useSelector((state) => {
    return state.loadingReducer
  })

  if(loadingData.loadingStatus){
    return(
        <Button variant={variant} disabled className="mx-3">Loading</Button>
    )
  }else{
    return(
        <Button variant={variant} onClick={onClick} className="mx-3">{title}</Button>
      )
    }
  }

export default LoadingButton