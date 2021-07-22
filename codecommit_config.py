import boto3
from subprocess import call

cc = boto3.client('codecommit')

response = cc.create_repository(
    repositoryName='tscdkworkshop_withapprovals',
    repositoryDescription='CDK Workshop Git Repo'
)

http_clone_url = response.get("repositoryMetadata").get("cloneUrlHttp")
cc_arn = response.get("repositoryMetadata").get("Arn")


def remove_git():
    call(["rm", "-rf", ".git"])


def git_init():
    call(["git", "init"])


def add_origin():
    print(f"Adding git remote origin {http_clone_url}")
    call(["git", "remote", "add", "origin", str(http_clone_url)])


def add_all_files():
    call(["git", "add", "-A"])
    call(["git", "commit", "-m", "\"init\""])


def initial_push():
    call("git push --set-upstream origin master".split(" "))


if __name__ == "__main__":
    remove_git()
    git_init()
    add_origin()
    add_all_files()
    initial_push()


