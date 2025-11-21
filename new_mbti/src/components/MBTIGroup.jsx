import Avatar from './Avatar';

function MBTIGroup({ mbtiType, members, message, customAvatarStyle }) {
  return (
    <section className={`${mbtiType} town`}>
      {members.map((member, index) => (
        <Avatar
          key={index}
          name={member.name}
          mbtiType={mbtiType}
          customStyle={customAvatarStyle}
        />
      ))}
      <div className="mbti-message-area">
        <img
          src={`/charac/tag/tag-${mbtiType}.svg`}
          alt="tag"
          className="tag"
        />
        {message && (
          <>
            <span className="message-indicator"></span>
            <article className="mbti-message">{message}</article>
          </>
        )}
      </div>
    </section>
  );
}

export default MBTIGroup;
