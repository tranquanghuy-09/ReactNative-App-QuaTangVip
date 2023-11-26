package vn.edu.iuh.fit.fullstackbackend.enums;

import lombok.Getter;

@Getter
public enum ProductStatus {
    ACTIVE(1),//đang kinh doanh
    IN_ACTIVE(0), //tam ngung
    TERMINATED(-1); //khong ban nua
    private final int value;

    ProductStatus(int value) {
        this.value = value;
    }

}
