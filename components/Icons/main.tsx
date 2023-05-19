import ArrowLeftIcon from "./arrowleft/main";
import BoxIcon from "./box/main";
import HomeIcon from "./home/main";
import MessageIcon from "./message/main";
import ProjectIcon from "./project/main";

const icons : {[key: string]: () => JSX.Element}= {
    home: HomeIcon,
    project: ProjectIcon,
    message: MessageIcon,
    arrowleft: ArrowLeftIcon,
    box: BoxIcon
}

export default icons;