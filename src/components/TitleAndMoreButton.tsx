import React from 'react';

interface TitleAndMoreButtonProps {
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  category?: string | undefined;
}

const TitleAndMoreButton = ({
  title,
  moreButtonTitle,
  category,
}: TitleAndMoreButtonProps) => {
  return (
    <>
      <div className="title-and-more-button">
        <div className="title">{title}</div>
        <div className="more-button">{moreButtonTitle}</div>
      </div>
    </>
  );
};

export default TitleAndMoreButton;
