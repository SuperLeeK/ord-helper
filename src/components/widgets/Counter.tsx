import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface CounterProps {
  uid: string;
  label: string;
  type: string;
  grade: string;
  image: string;
}

const Counter: React.FC<CounterProps> = ({
  uid,
  label,
  type,
  grade,
  image,
}) => {
  const [count, setCount] = useState<number>(0);
  const [lastModified, setLastModified] = useState<number | null>(null);

  useEffect(() => {
    const savedCount = localStorage.getItem(`counter_${uid}`);
    if (savedCount) setCount(parseInt(savedCount));

    const savedLastModified = localStorage.getItem(`lastModified_${uid}`);
    if (savedLastModified) setLastModified(parseInt(savedLastModified));
  }, [uid]);

  useEffect(() => {
    localStorage.setItem(`counter_${uid}`, count.toString());
  }, [uid, count]);

  useEffect(() => {
    if (lastModified) {
      localStorage.setItem(`lastModified_${uid}`, lastModified.toString());
    }
  }, [uid, lastModified]);

  const changeCount = (delta: number) => {
    const nickname = localStorage.getItem("userNickname");
    if (!nickname) {
      alert("닉네임을 먼저 설정해주세요.");
      return;
    }

    if (delta < 0 && count === 0) return;
    setCount((prevCount) => {
      const newCount = prevCount + delta;
      setLastModified(Date.now());
      copyToClipboard(newCount);
      return newCount;
    });
  };

  const copyToClipboard = (newCount: number) => {
    const nickname = localStorage.getItem("userNickname") || "UNKNOWN";
    const date = new Date();
    const formattedDate = date
      .toLocaleString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/[. :]/g, "");

    const textToCopy = `${nickname.toUpperCase()} ${formattedDate} ${label} ${grade} ${newCount}클`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("텍스트가 클립보드에 복사되었습니다: " + textToCopy);
        // 여기에 툴팁 표시 로직을 추가할 수 있습니다.
      })
      .catch((err) => {
        console.error("클립보드 복사 중 오류 발생: ", err);
      });
  };

  const getFormattedLastModified = () => {
    if (!lastModified) return "없음";
    return new Date(lastModified).toLocaleString();
  };

  return (
    <CounterWrapper fillPercentage={Math.min(count / 100, 1)}>
      <CounterHeader>
        <CounterImage src={image} alt={label} />
        <CounterLabel>{label}</CounterLabel>
      </CounterHeader>
      <CounterControls>
        <Button onClick={() => changeCount(-1)}>-</Button>
        <CounterValue id={uid}>{count}</CounterValue>
        <Button onClick={() => changeCount(1)}>+</Button>
      </CounterControls>
      <LastModified>최근 수정: {getFormattedLastModified()}</LastModified>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div<{ fillPercentage: number }>`
  // ... 스타일 정의
  background: linear-gradient(
    to right,
    #4caf50 ${(props) => props.fillPercentage * 100}%,
    transparent 0
  );
`;

const CounterHeader = styled.div`
  // ... 스타일 정의
`;

const CounterImage = styled.img`
  // ... 스타일 정의
`;

const CounterLabel = styled.span`
  // ... 스타일 정의
`;

const CounterControls = styled.div`
  // ... 스타일 정의
`;

const Button = styled.button`
  // ... 스타일 정의
`;

const CounterValue = styled.span`
  // ... 스타일 정의
`;

const LastModified = styled.div`
  // ... 스타일 정의
`;

export default Counter;
