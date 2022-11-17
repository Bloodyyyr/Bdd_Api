export default function Item(props) {
  return (
    <li
      className="border d-flex 
    justify-content-between align-item-center 
    p-2 m-2"
    >
      <div className="p-3"><p>Pseudo: {props.pseudo}</p></div>
      <div className="p-3"><p>Email: {props.mail}</p></div>
      <div className="btn-group mx-2 my-2">
      {props.interupteur
        ? <button onClick={() => props.selFunc(props.id)}
          className=" btn btn-primary">Modifier</button>
          
        : <p> x </p>

      }
        <button
          onClick={() => props.deletFunc(props.id)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}