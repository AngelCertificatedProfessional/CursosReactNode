import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
    constructor() {

    }

    onStart(payload: GitHubStarPayload): string {
        let message: string = '';
        const { action, sender, repository, starred_at } = payload;
        return `User ${sender.login} ${action} star on ${repository}`
    }

    onIssue(payload: GitHubIssuePayload) {
        const { action, issue } = payload;
        if (action === 'opened') {
            return `An issue was opened with this title ${issue.title}`
        }
        if (action === 'closed') {
            return `An issue was closed by ${issue.user.login}`
        }
        if (action === 'reopened') {
            return `An issue was closed by ${issue.user.login}`
        }
        return `Unhandle action for the issue event ${action}`

    }

}