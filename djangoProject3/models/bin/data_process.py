# data_preprocessing.py

import torch
from torch import Tensor


def em_impute_numerical(x_num: Tensor, missing_mask: Tensor, max_iterations: int):
    imputed_values = x_num.clone()
    for _ in range(max_iterations):
        # E-step: Estimate missing values based on current imputed values
        estimated_values = imputed_values.clone()
        estimated_values[missing_mask] = torch.mean(imputed_values[~missing_mask])

        # M-step: Update imputed values with the estimated values
        imputed_values[missing_mask] = estimated_values[missing_mask]

    return imputed_values


# EM-based imputation for categorical variables
def em_impute_categorical(x_cat: Tensor, missing_mask: Tensor, max_iterations: int):
    imputed_values = x_cat.clone()
    for _ in range(max_iterations):
        # E-step: Estimate missing values based on current imputed values
        estimated_values = imputed_values.clone()
        for feature_idx in range(x_cat.size(1)):
            unique_values = torch.unique(x_cat[:, feature_idx])
            for value in unique_values:
                if value == -1:
                    continue  # Skip the missing value marker
                observed_mask = (x_cat[:, feature_idx] == value) & (~missing_mask[:, feature_idx])
                if torch.any(observed_mask):
                    mode_value = value  # Use the mode value for imputation
                    estimated_values[missing_mask[:, feature_idx], feature_idx] = mode_value

        # M-step: Update imputed values with the estimated values
        imputed_values[missing_mask] = estimated_values[missing_mask]

    return imputed_values
# data_preprocessing.py

import torch
from torch import Tensor


def em_impute_numerical(x_num: Tensor, missing_mask: Tensor, max_iterations: int):
    imputed_values = x_num.clone()
    prev_theta=0
    for _ in range(max_iterations):
        # E-step: Estimate missing values based on current imputed values
        estimated_values = imputed_values.clone()
        estimated_values[missing_mask] = torch.mean(imputed_values[~missing_mask])

        # M-step: Update imputed values with the estimated values
        imputed_values[missing_mask] = estimated_values[missing_mask]
        theta = imputed_values[missing_mask].clone()
        if torch.norm(theta - prev_theta) < 1e-3:
            break
        prev_theta = imputed_values[missing_mask].clone()
    return imputed_values


# EM-based imputation for categorical variables
def em_impute_categorical(x_cat: Tensor, missing_mask: Tensor, max_iterations: int):
    imputed_values = x_cat.clone()
    for _ in range(max_iterations):
        # E-step: Estimate missing values based on current imputed values
        estimated_values = imputed_values.clone()
        for feature_idx in range(x_cat.size(1)):
            unique_values = torch.unique(x_cat[:, feature_idx])
            for value in unique_values:
                if value == -1:
                    continue  # Skip the missing value marker
                observed_mask = (x_cat[:, feature_idx] == value) & (~missing_mask[:, feature_idx])
                if torch.any(observed_mask):
                    mode_value = value  # Use the mode value for imputation
                    estimated_values[missing_mask[:, feature_idx], feature_idx] = mode_value

        # M-step: Update imputed values with the estimated values
        imputed_values[missing_mask] = estimated_values[missing_mask]

    return imputed_values
