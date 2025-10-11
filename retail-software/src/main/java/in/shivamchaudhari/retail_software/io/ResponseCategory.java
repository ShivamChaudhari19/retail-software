package in.shivamchaudhari.retail_software.io;

import lombok.*;

import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCategory {
    private String categoryId;
    private String name;
    private String description;
    private String bgColour;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
