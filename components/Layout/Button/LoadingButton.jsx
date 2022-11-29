import { Button } from "react-bootstrap";
import { useSelector } from "react-redux"


const LoadingButton = ({title, onClick, variant}) => {
  const loadingData = useSelector((state) => {
    return state.loadingReducer
  })

  if(loadingData.loadingStatus){
    return(
        <Button variant={variant} disabled >Loading</Button>
    )
  }else{
    return(
        <Button variant={variant} onClick={onClick}>{title}</Button>
      )
    }
  }

export default LoadingButton