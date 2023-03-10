/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import DeleteReservationButton from '../../atoms/DeleteReservationButton';
import { reserveListState } from '../../../recoil/recoil-deleteReservation';

const ReservationItem = ({ total }) => {
  const [reserveList, setReserveList] = useRecoilState(reserveListState);

  const removedReservation = (data, id) => {
    const items = data.filter((item) => item !== id);
    setReserveList(items);
  };

  return (
    <div css={[Performances]}>
      {total &&
        total.map((elem, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginRight: '3rem' }}>{idx + 1}</h2>
              <div css={[CardContainer]}>
                <Link href={`/description/${elem.id}`}>
                  <Image
                    src={elem.image}
                    alt={'이미지'}
                    height={200}
                    width={200}
                  />
                </Link>
                <div css={[CardBody]}>
                  <h5 css={[CardTitle]} title={elem.name}>
                    공연명 : {elem.name}
                  </h5>
                  <p css={[Detail]} title={elem.place}>
                    장소 : {elem.place}
                  </p>
                  <p css={[Detail]}>장르 : {elem.genre}</p>

                  <p css={[Detail]}>
                    기간 : {elem.start} ~ {elem.end}
                  </p>
                  <p css={[Detail]}>공연상태 : {elem.isPlaying}</p>
                </div>
              </div>
              <DeleteReservationButton
                id={elem.id}
                reserveList={reserveList}
                onRemoveReservation={removedReservation}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReservationItem;

const Performances = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 3rem;
`;

const CardContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
`;

const CardBody = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
  width: 20rem;
`;

const CardTitle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Detail = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
