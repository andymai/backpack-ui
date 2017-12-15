import React from "react";
import PropTypes from "prop-types";
import radium, { Style } from "radium";
import cn from "classnames";
import colors from "../../styles/colors";
import mq from "../../styles/mq";
import { rgba } from "../../utils/color";
import propTypes from "../../utils/propTypes";

const hoverStyles = {
  default: {
    ".CoverPhoto": {
      transform: "scale(1.03) !important",
    },
  },

  light: {
    ".Heading": {
      color: `${colors.linkPrimary} !important`,
    },
  },
};

const styles = {
  container: {
    height: "auto",
    maxWidth: "410px",
    minWidth: "216px",
    position: "relative",
  },

  card: {
    boxShadow: `0 0 20px ${rgba(colors.shadowPrimary, 0.12)}`,

    [`@media (min-width: ${mq.min[768]})`]: {
      boxShadow: `0 12px 34px ${rgba(colors.shadowPrimary, 0.12)}`,
    },
  },
};

const Card = ({
  children,
  layout,
  theme,
  className,
  style,
}) => (
  <div
    className={`${cn("Card", className)} Card--${theme}`}
    style={[
      styles.container,
      layout !== "tile" && styles.card,
      style,
    ]}
  >
    <Style
      scopeSelector=".Card:hover"
      rules={hoverStyles.default}
    />

    <Style
      scopeSelector=".Card--light:hover"
      rules={hoverStyles.light}
    />

    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(["tile", "card"]),
  theme: PropTypes.oneOf(["light", "dark"]),
  className: PropTypes.string,
  style: propTypes.style,
};

Card.defaultProps = {
  layout: "card",
  theme: "light",
};

export default radium(Card);
