import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import Container from "../container";
import ThumbnailList from "../thumbnailList";
import ThumbnailListItem from "../thumbnailListItem";
import VideoPlaylist from "../videoPlaylist";
import VideoInfo from "../videoInfo";
import VideoEmbed from "../videoEmbed";
import CardShelfVideoSlider from "../cardShelfVideoSlider";
import CardVideo from "../cardVideo";
import duration from "../../utils/time";
import media from "../../styles/mq";
import spacing from "../../styles/spacing";
import propTypes from "../../utils/propTypes";

const styles = {
  playlistContainer: {
    [`@media (max-width: ${media.max["720"]})`]: {
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  sliderContainer: {
    display: "none",
    marginTop: spacing.gutter,

    [`@media (min-width: ${media.min["560"]}) and (max-width: ${media.max["960"]})`]: {
      display: "block",
    },
  },

  listContainer: {
    display: "none",
    marginTop: spacing.gutter,

    [`@media (max-width: ${media.max["560"]})`]: {
      display: "block",
    },
  },
};

class VideoPlaylistWithSlider extends React.Component {

  constructor(props) {
    super(props);

    this.newPlaylist = true;

    this.state = {
      /*
        Initial video is not set as "active" so that the VideoInfo component
        doesn't initially render -- this is as designed.
      */
      activeVideo: null,
    };

    this.onLoadVideo = this.onLoadVideo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const videoIds = (this.props.videos || []).map(v => v.id).sort();
    const nextVideoIds = (nextProps.videos || []).map(v => v.id).sort();
    if (
      (videoIds.length !== nextVideoIds.length) ||
      (videoIds.filter((v, i) => v.id !== nextVideoIds[i].id).length !== 0)
    ) {
      // Assume a new playlist has been loaded and state should reset
      this.setState({ activeVideo: null });
      this.newPlaylist = true;
    }
  }

  onLoadVideo(video) {
    if (!this.newPlaylist) {
      this.setState({ activeVideo: video });
    }
    this.newPlaylist = false;
  }

  render() {
    const {
      video,
      videos,
      visibleVideosDesktop,
      visibleVideosMobile,
      autoplay,
      videoEmbed,
      heading,
      sliderHeading,
      mobile,
      showVideoInfo,
      style,
    } = this.props;

    const { activeVideo } = this.state;

    return (
      <div className="VideoPlaylistWithSlider" style={style}>
        {videos && videos.length > 0 &&
          <div>
            <Container style={styles.playlistContainer}>
              <VideoPlaylist
                heading={heading}
                mobile={mobile}
                video={video}
                videos={videos}
                visibleVideos={visibleVideosDesktop}
                autoplay={autoplay}
                onLoadVideo={this.onLoadVideo}
                videoEmbed={videoEmbed}
              />
            </Container>
            {showVideoInfo && activeVideo &&
              <Container>
                <VideoInfo
                  video={activeVideo}
                  fadeIn
                />
              </Container>
            }
            <div style={styles.sliderContainer}>
              <Container>
                <CardShelfVideoSlider
                  heading={sliderHeading || heading}
                  mobile={mobile}
                  spacing="compact"
                >
                  {videos.slice(0, visibleVideosDesktop).map((v) => (
                    <CardVideo
                      key={v.id}
                      heading={v.name}
                      runtime={v.duration}
                      imageSrc={v.cardImage}
                      href={v.url}
                      layout="tile"
                      spacing="compact"
                      mobile={mobile}
                      actionIcon={v.cardActionIcon}
                      onClick={v.cardOnClick}
                    />
                  ))}
                </CardShelfVideoSlider>
              </Container>
            </div>
            <div style={styles.listContainer}>
              <Container>
                <ThumbnailList heading={sliderHeading || heading}>
                  {videos.slice(0, visibleVideosMobile).map((v) => (
                    <ThumbnailListItem
                      key={v.id}
                      title={v.name}
                      href={v.url}
                      imagePath={v.thumbnailImage}
                      subtitle={[duration(v.duration)]}
                      lineClamp={false}
                    />
                  ))}
                </ThumbnailList>
              </Container>
            </div>
          </div>
        }
      </div>
    );
  }
}

const videoShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  duration: PropTypes.number,
  host: PropTypes.string,
  director: PropTypes.string,
  year: PropTypes.string,

  /* recommended dimensions: 915x515 */
  image: PropTypes.string,

  /* recommended dimensions: 430x250 */
  cardImage: PropTypes.string,

  /* recommended dimensions: 160x90 */
  thumbnailImage: PropTypes.string,

  cardActionIcon: PropTypes.string,
  cardOnClick: PropTypes.func,
};

VideoPlaylistWithSlider.propTypes = {
  video: PropTypes.shape(videoShape),
  videos: PropTypes.arrayOf(PropTypes.shape(videoShape)).isRequired,
  heading: PropTypes.string.isRequired,
  sliderHeading: PropTypes.string,
  visibleVideosDesktop: PropTypes.number.isRequired,
  visibleVideosMobile: PropTypes.number.isRequired,
  autoplay: PropTypes.bool,
  videoEmbed: PropTypes.shape({
    ...VideoEmbed.propTypes,
    videoId: PropTypes.string,
  }),
  mobile: PropTypes.bool,
  showVideoInfo: PropTypes.bool,
  style: propTypes.style,
};

VideoPlaylistWithSlider.defaultProps = {
  heading: "Featured videos",
  visibleVideosDesktop: 12,
  visibleVideosMobile: 4,
};

export default radium(VideoPlaylistWithSlider);
