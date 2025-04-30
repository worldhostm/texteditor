'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './css/publishSettingsModal.module.css';
import CustomDatePicker from '@/app/_components/DatePicker';

interface PublishSettingsModalProps {
  isOpen: boolean;
  title: string;
  publishDate: string;
  onChangePublishDate: (date: string) => void;
  isScheduled: boolean;
  setisScheduled : Dispatch<SetStateAction<boolean>>
  onConfirm: () => void;
  onClose: () => void;
}

const PublishSettingsModal: React.FC<PublishSettingsModalProps> = ({
  isOpen,
  title,
  publishDate,
  onChangePublishDate,
  isScheduled,
  setisScheduled,
  onConfirm,
  onClose,
}) => {
  // if (!isOpen) return null;
useEffect(() => {
  console.info('isScheduled',isScheduled);
}, [isScheduled])

  return (
    <div className={`${styles.modalcontainer} ${isOpen ? styles.isActive: styles.isInActive}`}>
      <div className={`${styles.modalcontent}`}>
        <div className={`${styles.modalTitle} hana_bold`}>발행 설정</div>
        <div style={{
          display:'flex',
          width:'100%',
          height : '300px',
        }}>
          <div 
          style={{
            flex : 0.7
            }}>
              <div className={`${styles.modalitem}`}>
            <div>제목</div>
            <div>{title}</div>
          </div>
          <div className={`${styles.modalitem}`}>
            <div>발행일</div>
            <div className={`${styles.evenly}`}>
              <label 
              htmlFor='present'
              className={`${isScheduled && styles.Gray300}`}
              onClick={()=>setisScheduled(false)}
              >
                현재
                <input
                  id="present"
                  type="radio"
                  name="scheduled"
                />
              </label>
              <div className={`${styles.Gray300}`}> | </div>
              <label 
              htmlFor="reserve"
              className={`${!isScheduled && styles.Gray300}`}
              onClick={()=>setisScheduled(true)}
              >
                예약
                <input
                  id="reserve"
                  type="radio"
                  name="scheduled"
                  onChange={() => {
                    setisScheduled(true);
                  }}
                />
              </label>
            </div>
            {
              isScheduled && <CustomDatePicker /> 
            }
          </div>
          </div>
          <div style={{flex:0.3, width:'100%',display:'flex', justifyContent:'flex-end'}}>
            <img src="/img/t1.jpg" width={300} height={300} alt="asddas"/>
          </div>
      </div>

        <div className={`${styles.modalactions}`}>
          <button className='buttonStyle' onClick={onConfirm}>확인</button>
          <button className='buttonStyle' onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PublishSettingsModal;
