import torch
from torch import Tensor
from sklearn.impute import KNNImputer
from torch import mode

def em_impute_numerical(x_num: Tensor, missing_mask: Tensor, max_iterations: int, tol: float = 1e-3):
    theta = torch.mean(x_num, dim=0)
    prev_theta = theta.clone()

    for i in range(max_iterations):

        # E-step:
        x_missing = x_num.clone()
        x_missing[missing_mask] = theta[missing_mask]

        # M-step:
        theta = torch.mean(x_missing, dim=0)

        if torch.norm(theta - prev_theta) < tol:
            break

        prev_theta = theta.clone()

    return x_missing


def em_impute_categorical(x_cat: Tensor, missing_mask: Tensor, max_iterations: int, tol: float = 1e-3):
    theta = mode(x_cat, dim=0)[0]
    prev_theta = theta.clone()

    for i in range(max_iterations):

        # E-step:
        x_missing = x_cat.clone()
        x_missing[missing_mask] = theta[missing_mask]

        # M-step:
        theta = mode(x_missing, dim=0)[0]

        if torch.norm(theta - prev_theta) < tol:
            break

        prev_theta = theta.clone()

    return x_missing