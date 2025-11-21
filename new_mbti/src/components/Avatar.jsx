function Avatar({ name, mbtiType, customStyle }) {
  return (
    <div className="avatar">
      <article className="avatarName">{name}</article>
      <img
        src={`/charac/${mbtiType}.svg`}
        alt={mbtiType}
        className="avatarImage"
        style={customStyle}
      />
    </div>
  );
}

export default Avatar;
