#!/bin/bash

branches=("test" "test02")  # 指定要合并的分支列表

for branch in "${branches[@]}"
do
    git checkout "$branch"    # 切换到目标分支
    git merge origin/feature-2.0.0          # 将 master 分支合并到目标分支
done