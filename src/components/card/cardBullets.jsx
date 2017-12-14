import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import BulletDescription from "../bulletDescription";
import mq from "../../styles/mq";
import propTypes from "../../utils/propTypes";

const mediaQuery = `@media (max-width: ${mq.max["768"]})`;

const styles = {
  default: {
    [mediaQuery]: {
      fontSize: "9px",
    },
  },

  normal: {
    marginBottom: "9px",

    [mediaQuery]: {
      marginBottom: "6px",
    },
  },

  compact: {
    marginBottom: "6px",
  },
};

const CardBullets = ({ bullets, spacing, style }) => (
  <BulletDescription
    description={bullets}
    style={[
      styles.default,
      spacing === "compact" ? styles.compact : styles.normal,
      style,
    ]}
  />
);

CardBullets.propTypes = {
  bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
  spacing: PropTypes.oneOf([
    "normal",
    "compact",
  ]),
  style: propTypes.style,
};

CardBullets.defaultProps = {
  spacing: "normal",
};

export default radium(CardBullets);
