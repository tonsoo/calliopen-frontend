import { ReactSVG } from 'react-svg';
import GithubSvg from '../../../../assets/icons/socials/github.svg';
import './GithubProject.scss';
import type DefaultProps from '../../../../traits/DefaultProps';

interface GithubProjectProps extends DefaultProps {

}

export default function GithubProject({
    className = ""
} : GithubProjectProps) {
    return (
        <a href="https://github.com/tonsoo/calliopen-frontend" target="_blank" className={"app-github-project hoverable " + className}>
            <ReactSVG src={GithubSvg} className="github-icon icon has-icon aspect-square" />
            <p className="project">Github Project</p>
        </a>
    );
}