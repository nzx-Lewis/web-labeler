import EnvLabel from "./EnvLabel";
import { EnvBadge } from "./EnvBadge";
import { EnvIcon } from "./EnvIcon";

const envLabel = new EnvLabel();
const envBadge = new EnvBadge();
const envIcon = new EnvIcon();

envLabel.subscribe(envBadge.update.bind(envBadge));
envLabel.subscribe(envIcon.update.bind(envIcon));

envLabel.init();
