// Pagination.tsx
import React, { useState, useEffect, FC } from 'react';
import styles from './pagination.module.css';
import SVGIcon from './SVGIcon';

// 인터페이스 정의
interface PaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  pageBlockSize?: number;
  onPageChange?: (page: number) => void;
}

// 페이지네이션 컴포넌트
const Pagination: FC<PaginationProps> = ({
  initialPage = 1,
  itemsPerPage = 20,
  totalItems = 2000, // 예시로 총 2000개의 아이템 가정
  pageBlockSize = 5,
  onPageChange,
}) => {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 현재 페이지 블럭 계산
  const currentBlock = Math.ceil(currentPage / pageBlockSize);
  const startPage = (currentBlock - 1) * pageBlockSize + 1;
  const endPage = Math.min(startPage + pageBlockSize - 1, totalPages);
  
  // 페이지 번호 배열 생성
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  // 가상의 데이터 생성 함수
  const fetchData = (page: number): void => {
    setLoading(true);
    // API 호출을 시뮬레이션
    setTimeout(() => {
      const newData: string[] = [];
      const startItem = (page - 1) * itemsPerPage + 1;
      const endItem = Math.min(page * itemsPerPage, totalItems);
      
      for (let i = startItem; i <= endItem; i++) {
        newData.push(`아이템 ${i}`);
      }
      
      setData(newData);
      setLoading(false);
    }, 300);
  };
  
  // 페이지 변경 핸들러
  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    // 부모 컴포넌트에 페이지 변경 알림
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // 페이지 변경시 데이터 로드
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);
  
  return (
    <div className={styles.container}>
      {/* 페이지네이션 컨트롤 */}
      <div className={styles.paginationControls}>
        {/* 첫 페이지 버튼
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? styles.buttonDisabled : styles.button}
          aria-label="첫 페이지로 이동"
        >
          &laquo;
        </button> */}
        
        {/* 이전 블럭 버튼 */}
        <button
          onClick={() => handlePageChange(startPage - 1)}
          disabled={startPage === 1}
          className={startPage === 1 ? styles.buttonDisabled : styles.button}
          aria-label="이전 블럭으로 이동"
        >
          <SVGIcon id="prevbtn"/>
        </button>
        
        {/* 페이지 버튼들 */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`${currentPage === number ? styles.activeButton : styles.button} bodyS pretendard-regular`}
            aria-label={`${number} 페이지로 이동`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
        
        {/* 다음 블럭 버튼 */}
        <button
          onClick={() => handlePageChange(endPage + 1)}
          disabled={endPage === totalPages}
          className={endPage === totalPages ? styles.buttonDisabled : styles.button}
          aria-label="다음 블럭으로 이동"
        >
          <SVGIcon id="nextbtn"/>
        </button>
        
        {/* 마지막 페이지 버튼
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? styles.buttonDisabled : styles.button}
          aria-label="마지막 페이지로 이동"
        >
          &raquo;
        </button> */}
      </div>
      
      {/* 직접 입력 필드 */}
      {/* <div className={styles.pageInput}>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const page = parseInt(e.target.value);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
              setCurrentPage(page);
              if (onPageChange) {
                onPageChange(page);
              }
            }
          }}
          className={styles.inputField}
          aria-label="페이지 직접 입력"
        />
        <span>/ {totalPages} 페이지로 이동</span>
      </div> */}
    </div>
  );
};

export default Pagination;