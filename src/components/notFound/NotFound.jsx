import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackLoginHandler = () =>{
        navigate("/login");
    }
  return (
    <div>
        <h2>La pagina solicitada no fue encontrada</h2>
        <Button className="text-center" onClick={goBackLoginHandler}>
            Iniciar sesion
        </Button>
    </div>
  )
}

export default NotFound