import UserCard from 'src/components/molecules/UserCard';

/**
 * ユーザが作成した手記リスト
 *
 * @param {*} userDataList
 * @return {*}
 */
export const UserList = ({ userDataList }) => {
  return (
    <>
      {userDataList?.map((x) => (
        <UserCard
          key={x.userData.uid}
          userName={x.userData.userName}
          userData={x.userData}
        />
      ))}
    </>
  );
};
