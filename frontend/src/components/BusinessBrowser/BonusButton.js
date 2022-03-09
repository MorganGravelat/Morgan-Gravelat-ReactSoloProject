const BonusButton = props => {
    return (
      <div className={props.hidden ? 'bb is-hidden' : 'bb'} onClick={props.onClick}>
        <span aria-label="add" role="img" className="fab-symbol">➕</span>
      </div>
    );
  };

  export default BonusButton;
