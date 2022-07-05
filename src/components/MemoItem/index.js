import './index.css';

const MemoItem = ({ children, onClickItem, isSelected, onClickDelete }) => {
  return (
    <div
      className={'MemoItem' + (isSelected ? ' selected' : '')}
      onClick={onClickItem}
    >
      {/* 이렇게 하면, 목록에 대한 의존도가 생겨버림. 그래서 위에같이 리스트에서 뭘 내려주던 함수를 실행하기만 되는 형태로 해주는 것이 좀 더 편한 방법인 듯.
      <div
        onClick={() => {
          console.log('clicked');
          setSelectedMemoIndex(index);
        }}
      > */}
      {children}
      <button className="MemoItem__delete-button" onClick={onClickDelete}>
        ❌
      </button>
    </div>
  );
};

export default MemoItem;
