package in.shivamchaudhari.retail_software.io;

import lombok.Builder;
import lombok.Data;
import java.sql.Timestamp;

@Builder
@Data
public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;
    private String bgColour;
    private String imgUrl;
    private Timestamp createAt;
    private Timestamp updatedAt;

}
