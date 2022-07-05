import './index.css';

const SideBarFooter = ({ onClick }) => {
  return (
    <div className="SideBarFooter">
      <button className="SideBarFooter__add-button" onClick={onClick}>
        +
      </button>
    </div>
  );
};

export default SideBarFooter;
