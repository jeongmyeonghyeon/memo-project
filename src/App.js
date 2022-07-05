import { useCallback, useState } from 'react';
import './App.css';
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import { getItem, setItem } from './lib/storage';
import debounce from 'lodash.debounce';

const debouncedSetItem = debounce(setItem, 5000);

function App() {
  const [memos, setMemos] = useState(getItem('memo') || []);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  const setMemo = useCallback(
    (newMemo) => {
      /**
       * (1)
       * 불변성을 헤침.
       * 여기서의 '불변'은 render가 일어나기 전까지의 '불변'을 의미함.
       * 지금 같이 심플한 처리에서는 상관이 없지만,
       * 데이터가 커지면 '불확실한' 동작이 많아져 오류를 야기할 수 있고 이는 라이프사이클에 영향을 미칠 수 있음.
       */
      // memos[selectedMemoIndex] = newMemo;
      // setMemos([...memos]);

      // (2) 불변성 유지
      // const newMemos = [...memos];
      // newMemos[selectedMemoIndex] = newMemo;
      // setMemos(newMemos);

      // (3) setter의 param(prev state)을 활용해 의존성 배열을 조금 성능 좋게 정리.
      // 위의 코드처럼 사용하면 의존성 배열에 이 컴포넌트의 모든 상태인 memo와 selectedMemoIndex를
      // 모두 사용해 useCallback을 사용하는 의미가 없으므로 (항상 re-render ^^;)
      // 해당 state의 이전 상태값인 setter의 파라미터를 사용해 의존성 배열에서 memos 를 빼줌.
      setMemos((memos) => {
        const newMemos = [...memos];
        newMemos[selectedMemoIndex] = newMemo;
        debouncedSetItem('memo', newMemos);
        return newMemos;
      });
      // debouncedSetItem('memo', newMemos);
    },
    [selectedMemoIndex],
  );

  const addMemo = useCallback(() => {
    setMemos((memos) => {
      const now = new Date().getTime();
      const newMemos = [
        ...memos,
        {
          title: 'Untitled',
          content: '',
          createdAt: now,
          updatedAt: now,
        },
      ];
      debouncedSetItem('memo', newMemos);
      return newMemos;
    });
    setSelectedMemoIndex(memos.length);
  }, [memos]);

  const deleteMemo = useCallback(
    (index) => {
      setMemos((memos) => {
        const newMemos = [...memos];

        newMemos.splice(index, 1);
        debouncedSetItem('memo', newMemos);

        return memos;
      });
      if (index === selectedMemoIndex) {
        setSelectedMemoIndex(0);
      }
    },
    [selectedMemoIndex],
  );

  return (
    <>
      <div className="App">
        <SideBar
          memos={memos}
          addMemo={addMemo}
          deleteMemo={deleteMemo}
          setSelectedMemoIndex={setSelectedMemoIndex}
          selectedMemoIndex={selectedMemoIndex}
        />
        <MemoContainer memo={memos[selectedMemoIndex]} setMemo={setMemo} />
      </div>
    </>
  );
}

export default App;
