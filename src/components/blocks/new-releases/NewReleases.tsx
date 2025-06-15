import ScrollList from "../../generics/wrappers/scroll-list/ScrollList";
import TitleWrapper from "../../generics/wrappers/title-wrapper/TitleWrapper";
import Album from "./album/Album";

export default function NewReleases() {
    return (
        <TitleWrapper className="new-releases" title="New releases">
            <ScrollList className="gap-8">
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
                <Album />
            </ScrollList>
        </TitleWrapper>
    );
}