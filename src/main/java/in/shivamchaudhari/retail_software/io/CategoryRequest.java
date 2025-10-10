package in.shivamchaudhari.retail_software.io;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor

public class CategoryRequest {
    private String name;
    private String description;
    private String bgColour;
}
