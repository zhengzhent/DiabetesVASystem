#install.packages('corrplot')
library(corrplot)
A=read.csv('F:\\A_MyWork\\Research\\MedicalVisualization_BasedonTable2Graph\\FeatureRelationGraph\\Data_Updated\\Origin\\classes3.csv') # nolint
head(A)
variable_names <- A$X
A <- A[, -1]
A<-A*8.5
rownames(A) <- variable_names
# 将相关性矩阵数据存储为矩阵
cor_matrix <- as.matrix(A)
png(file = "F:\\A_MyWork\\Research\\MedicalVisualization_BasedonTable2Graph\\FeatureRelationGraph\\correlation_plot3.png",  # nolint: line_length_linter.
    width = 1600, height = 1600 # nolint
    )
corrplot(cor_matrix,  tl.col = "black", tl.cex = 1,tl.srt=45,cl.cex = 1)
dev.off()    # 结束图像绘制并保存