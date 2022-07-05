import MemoItem from '../MemoItem';

const MemoList = ({
  memos,
  setSelectedMemoIndex,
  selectedMemoIndex,
  deleteMemo,
}) => {
  return (
    <div>
      {memos.map((memo, index) => (
        <MemoItem
          key={index}
          onClickItem={() => {
            setSelectedMemoIndex(index);
          }}
          isSelected={index === selectedMemoIndex}
          onClickDelete={(e) => {
            deleteMemo(index);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {memo.title}
        </MemoItem>
      ))}
    </div>
  );
};

export default MemoList;
