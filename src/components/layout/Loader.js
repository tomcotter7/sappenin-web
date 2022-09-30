import Spinner from 'react-bootstrap/Spinner'

/**
 * A functional component to display a Spinner in the center of the container.
 * @author Thomas Cotter
 * @component
*/ 

const Loader = () => {
  return (
    <div className="text-center">
      <Spinner animation="grow" variant="sap"/>
    </div>
  )
}

export default Loader;
