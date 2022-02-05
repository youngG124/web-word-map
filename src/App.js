import Subject from './components/Subject';
import CreateWord from './components/CreateWord';
import WordList from './components/WordList';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import './App.css';

const countActiveWords = (words) => {
  console.log('counting active words...');
  return words.filter(word => word.active).length;
}

function App() {
  // state 초기화
  const [inputs, setInputs] = useState({
      kor: '',
      en: ''
  });

  // 초기화한 kor, en을 비구조화 할당
  const { kor, en } = inputs;

  // 새로 복사한 객체 뒤에 빈칸의 값을 추가
  // 변화 생길 때 마다 새로운 객체 생성
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  const onReset = useCallback(() => {
    setInputs({
      kor:'',
      en:''
    })
  })

  // 단어 객체들로 이뤄진 배열 초기상태
  const [ words, setWords ] = useState([
    {
      id: 1,
      kor: '사랑하다',
      en: 'love',
      active:true
    },
    {
      id: 2,
      kor: '싫어하다',
      en: 'hate',
      active:false
    },
    {
      id: 3,
      kor: '관리하다',
      en: 'manage',
      active:false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const word = {
      id: nextId.current,
      kor,
      en
    };
    setWords(words => words.concat(word));

    setInputs({
      kor:'',
      en:''
    });
    nextId.current += 1;
  }, [kor, en]);

  // 함수가 실행된 위치의 id
  const onRemove = useCallback(id => {
    setWords(words => words.filter(word => word.id !== id));
  }, []);

  // 함수가 실행된 위치의 id와 일치하는 id의 active값을 반대로,
  // 아닌경우 그대로. 3항연산자 사용 
  const onToggle = useCallback(id => {
    setWords(words =>
      words.map(word =>
        word.id === id ? { ...word, active: !word.active } : word
      )
    );
  }, []);

  const count = useMemo(() => countActiveWords(words), [words]);

  //App 컴포넌트 랜더링
  return (
    <div className="App">
      <Subject />
      <CreateWord 
        kor = {kor}
        en = {en}
        onChange = {onChange}
        onCreate = {onCreate}
        onReset = {onReset}
      />
      <WordList words={words} onRemove={onRemove} onToggle={onToggle}/>
      <div>number of chosen words : {count}</div>
    </div>
  );
}

export default App;
