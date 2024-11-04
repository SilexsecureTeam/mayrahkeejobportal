import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({
  rightIcon,
  leftIcon,
  title,
  subtitle,
  smallText,
  smallTextIcon,
  smallTextIconColor,
  link,
}) => {
  const navigate = useNavigate();

  // Determine the URL based on the subtitle
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="bg-white border border-gray-200 h-60 hover:bg-green-500 hover:cursor-pointer" onClick={handleClick}>
      <div className={`flex items-start mt-10 px-10 justify-between gap-10`}>
        {rightIcon && <div className={`text-7xl text-green-500 `}>{rightIcon}</div>}
        <div>
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="mt-2 text-lg font-bold">{subtitle}</p>
          {smallText && (
            <div className={`mt-1 text-xs flex gap-2 items-center`}>
              <span
                className={`text-xs ${smallTextIconColor ?? "text-green-500"
                  } bg-green-100 h-5 w-5 rounded-full flex items-center justify-center`}
              >
                {smallTextIcon}
              </span>
              <span className="text-gray-400">{smallText}</span>
            </div>
          )}
        </div>
        {leftIcon && (
          <div
            className={`text-xl text-green-500 bg-green-100 h-10 w-10 rounded-full flex items-center justify-center`}
          >
            {leftIcon}
          </div>
        )}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  title: PropTypes.any.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  smallText: PropTypes.string,
  smallTextIcon: PropTypes.element,
  smallTextIconColor: PropTypes.string,
  link: PropTypes.string,
};

export default DashboardCard;