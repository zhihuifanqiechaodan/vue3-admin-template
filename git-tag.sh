#!/bin/bash

# 源分支名称
source_branch="feature-2.0.0"     

# 指定要合并的分支列表
branches=("test" "test02")  

for branch in "${branches[@]}"

do
    # 切换到目标分支
    git checkout "$branch"  

    # 将源分支合并到目标分支  
    git merge source_branch

    # 将目标分支推送到远程仓库
    git push origin "$branch"  
done