function ProfileCard({ card }) {
  return (
    <div className="greenCard">
      <h3>
        {card.firstName} {card.lastName}
      </h3>
      <p>{card.email}</p>
      <p>{card.phone}</p>
    </div>
  );
}

export default ProfileCard;
